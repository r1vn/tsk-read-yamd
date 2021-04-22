'use strict'; // 2021-04-14 09.40
const path = require('path');
class xdPath {
    /**
    path.resolve() except the path is returned with / separators on windows
    @example
    xdPath.abs('foo/bar/baz')     // 'C:/Users/w/foo/bar/baz'
    xdPath.abs('foo\\bar\\baz')   // 'C:/Users/w/foo/bar/baz'
    xdPath.abs('/foo/bar/baz')    // 'C:/foo/bar/baz'
    xdPath.abs('\\foo\\bar\\baz') // 'C:/foo/bar/baz'
    */
    static abs(p) {
        return (process.platform === 'win32') ? path.resolve(p).replace(/\\/g, '/') : path.resolve(p);
    }
    /**
    normalizes a relative or absolute path
    - \\ are replaced with / on windows
    - consequent / are replaced with single /
    - trailing / is removed
    @example
    xdPath.std('foo\\bar\\baz')             // 'foo/bar/baz'
    xdPath.std('\\foo\\bar\\baz\\')         // '/foo/bar/baz'
    xdPath.std('\\\\foo\\\\bar\\\\baz\\\\') // '/foo/bar/baz'
    */
    static std(p) {
        if (process.platform === 'win32')
            p = p.replace(/\\/g, '/');
        return p.replace(/\/{2,}/g, '/').replace(/\/$/, '');
    }
    /**
    gets the extension from a filepath or filename
    @example
    xdPath.ext('lorem/ipsum/foo.tar.xz')  // { single: 'xz', double: 'tar.xz' }
    xdPath.ext('lorem/ipsum/foo.tar.xz.') // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/foo.tar')     // { single: 'tar', double: '' }
    xdPath.ext('lorem/ipsum/foo.tar.')    // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/foo')         // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/foo.')        // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/.foo')        // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/.foo.')       // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/.foo.tar')    // { single: 'tar', double: '' }
    xdPath.ext('lorem/ipsum/.foo.tar.')   // { single: '', double: '' }
    xdPath.ext('lorem/ipsum/foo.tar.xz')  // { single: 'xz', double: 'tar.xz' }
    xdPath.ext('lorem/ipsum/foo.tar.xz.') // { single: '', double: '' }
    */
    static ext(p) {
        if (process.platform === 'win32')
            p = p.replace(/\\/g, '/');
        const fn = (p.indexOf('/') === -1) ? p : p.slice(p.lastIndexOf('/') + 1);
        const ms = fn.match(/.+\.([^.]+$)/);
        const md = fn.match(/.+\.([^.]+)\.([^.]+$)/);
        const double = (md) ? `${md[1]}.${md[2]}` : '';
        const single = (ms) ? ms[1] : '';
        return { single, double };
    }
}
exports.xdPath = xdPath;
