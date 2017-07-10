# coding: utf-8
import time
import base64
import hashlib
import functools
from flask import g, request, session, current_app
from flask import flash, url_for, redirect, abort
from flask_babel import lazy_gettext as _
from ..models import Account

from trace import *

class require_role(object):
    roles = {
        'spam': 0,
        'new': 1,
        'user': 2,
        'staff': 3,
        'admin': 4,
    }

    def __init__(self, role):
        self.role = role

    def __call__(self, method):
        @functools.wraps(method)
        def wrapper(*args, **kwargs):
            if not g.user:
                url = url_for('account.signin')
                if '?' not in url:
                    url += '?next=' + request.url
                return redirect(url)
            if self.role is None:
                return method(*args, **kwargs)
            if g.user.id == 1:
                # this is superuser, have no limitation
                return method(*args, **kwargs)
            if g.user.role == 'new':
                flash(_('Please verify your email'), 'warn')
                return redirect('/account/settings')
            if g.user.role == 'spam':
                flash(_('You are a spammer'), 'error')
                return redirect('/')
            if self.roles[g.user.role] < self.roles[self.role]:
                return abort(403)
            return method(*args, **kwargs)
        return wrapper


require_login = require_role(None)
require_user = require_role('user')
require_staff = require_role('staff')
require_admin = require_role('admin')


def get_current_user():
    # 如果session里面有用户的信息，就表示当前的用户可以登录，可以通过验证
    # 终于明白了，session的信息都是保存在客户端的，信息的源头是由服务端提供的
    # 但是关于session保留多长，都是浏览器来处理的，session里面有一个cookies的
    # 过期时间的信息
    #debug.app_trace(["get_current_user:start:"])
    
    if 'id' in session and 'token' in session:
        #debug.app_trace(["get_current_user:session has user info:"])
        
        user = Account.query.get(int(session['id']))
        if not user:
            return None
        if user.token != session['token']:
            return None
        return user
    
    # 如果session里面没有用户的信息，就表示当前用户没有登录
    #debug.app_trace(["get_current_user:session has no user info:"])
    return None


def login_user(user, permanent=False):
    if not user:
        return None
    # 用户登录就是把用户的信息保存在session里面
    session['id'] = user.id
    session['token'] = user.token
    if permanent:
        session.permanent = True
    return user


def logout_user():
    if 'id' not in session:
        return
    # 用户退出就是把用户的信息从session里面去掉
    session.pop('id')
    session.pop('token')


def create_auth_token(user):
    timestamp = int(time.time())
    secret = current_app.secret_key
    token = '%s%s%s%s' % (secret, timestamp, user.id, user.token)
    hsh = hashlib.sha1(token).hexdigest()
    return base64.b32encode('%s|%s|%s' % (timestamp, user.id, hsh))


def verify_auth_token(token, expires=30):
    try:
        token = base64.b32decode(token)
    except:
        return None
    bits = token.split('|')
    if len(bits) != 3:
        return None
    timestamp, user_id, hsh = bits
    try:
        timestamp = int(timestamp)
        user_id = int(user_id)
    except:
        return None
    delta = time.time() - timestamp
    if delta < 0:
        return None
    if delta > expires * 60 * 60 * 24:
        return None
    user = Account.query.get(user_id)
    if not user:
        return None
    secret = current_app.secret_key
    _hsh = hashlib.sha1('%s%s%s%s' % (secret, timestamp, user_id, user.token))
    if hsh == _hsh.hexdigest():
        return user
    return None
