#encoding:utf8

import sys

class Debug(object):
    
    def __init__(self):
        pass
    
    def info(self):
        pass
        print "info"
    
    def url_sep(self, handler):
        pass
        print '\n\n'
        print '<========  %s  ========>' % handler    
    
    def trace(self,message):
        print "trace:",message

    def test_trace(self,message):
        print "test_trace:",message
        
    def app_trace(self,message):
        print "app_trace:", message
    
    def log_error(self,message):
        print message

debug=Debug()
