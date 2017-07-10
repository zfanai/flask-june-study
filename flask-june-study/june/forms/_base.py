# coding: utf-8

from flask import _request_ctx_stack
from flask_wtf import Form
from flask_babel import get_locale
from speaklater import make_lazy_string
from babel import support
from wtforms.ext.i18n.utils import messages_path

__all__ = ['BaseForm']


def _get_translations():
    """Returns the correct gettext translations.
    Copy from flask-babel with some modifications.
    """
    ctx = _request_ctx_stack.top
    if ctx is None:
        return None
    # babel should be in extensions for get_locale
    if 'babel' not in ctx.app.extensions:
        return None
    translations = getattr(ctx, 'wtforms_translations', None)
    if translations is None:
        dirname = messages_path()
        translations = support.Translations.load(
            dirname, [get_locale()], domain='wtforms'
        )
        ctx.wtforms_translations = translations
    return translations


def _gettext(string):
    t = _get_translations()
    if t is None:
        return string
    if hasattr(t, 'ugettext'):
        return t.ugettext(string)
    # Python 3 has no ugettext
    return t.gettext(string)


def _ngettext(singular, plural, n):
    t = _get_translations()
    if t is None:
        if n == 1:
            return singular
        return plural

    if hasattr(t, 'ungettext'):
        return t.ungettext(singular, plural, n)
    # Python 3 has no ungettext
    return t.ngettext(singular, plural, n)


class _Translations(object):
    def gettext(self, string):
        return make_lazy_string(_gettext, string)

    def ngettext(self, singular, plural, n):
        return make_lazy_string(_ngettext, singular, plural, n)

_translations = _Translations()


class BaseForm(Form):
    def __init__(self, *args, **kwargs):
        self._obj = kwargs.get('obj', None)
        super(BaseForm, self).__init__(*args, **kwargs)

    def _get_translations(self):
        return _translations
