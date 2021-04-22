/**
recursive fs.readdirSync<br>
returned paths are relative. uses `/` as path separator on windows
@example
 // Given a folder `C:\foo` with the following contents:
 // C:\foo\bar
 // C:\foo\bar\bob.txt
 // C:\foo\baz
 // C:\foo\baz\alice.txt
 // C:\foo\hello, world.txt
xdDirScan('C:/foo')
 // [
 //   'bar',
 //   'bar/bob.txt',
 //   'baz',
 //   'baz/alice.txt',
 //   'hello, world.txt'
 // ]
xdDirScan('C:/foo', 'dirs')
 // [
 //   'bar',
 //   'baz'
 // ]
xdDirScan('C:/foo', 'files')
 // [
 //   'bar/bob.txt',
 //   'baz/alice.txt',
 //   'hello, world.txt'
 // ]
*/
export declare function xdDirScan(dirPathAbs: string, type?: 'all' | 'dirs' | 'files', __origin?: string, __isRecursiveCall?: boolean, __itemList?: string[]): string[];
