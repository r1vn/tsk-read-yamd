export declare class xdPath {
    /**
    path.resolve() except the path is returned with / separators on windows
    @example
    xdPath.abs('foo/bar/baz')     // 'C:/Users/w/foo/bar/baz'
    xdPath.abs('foo\\bar\\baz')   // 'C:/Users/w/foo/bar/baz'
    xdPath.abs('/foo/bar/baz')    // 'C:/foo/bar/baz'
    xdPath.abs('\\foo\\bar\\baz') // 'C:/foo/bar/baz'
    */
    static abs(p: string): string;
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
    static std(p: string): string;
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
    static ext(p: string): {
        single: string;
        double: string;
    };
}
