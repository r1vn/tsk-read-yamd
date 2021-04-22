parses YAML+markdown source files

```
---
title: Hello world
date: 2021-01-01 12:34
---
# Hello, world
lorem ipsum dolor ...
```
->
```
{
    path: 'source.md',
    data: {
        title: 'Hello world',
        date: '2021-01-01 12:34'
    },
    html: '<h1>Hello, world</h1><p>lorem ipsum dolor ...'
}
```

## setup

- download [tsk-read-yamd.tar.xz](https://github.com/r1vn/tsk-read-yamd/raw/master/tsk-read-yamd.tar.xz) and unpack as `your-project/lib/tsk-read-yamd`
- add a config entry to the manifest

example config: parsing all YAMD files from `source` into `tmp/sources.json`

```
{
    module: 'lib/tsk-read-yamd',
    config:
    {
        // path of the directory to get files from
        sourceDir: 'source',
        // filter for the files in sourceDir
        filterFn: srcPath => srcPath.endsWith('.md'),
        // JSON output file path
        outputFile: 'tmp/sources.json',
        // if set to false, entries will be appended to the existing output file instead of overwriting it
        overwrite: true,
        // toggles verbose output
        verbose: true
    }
}
```

input:

```
source/bar/index.md
source/baz/index.md
source/about.md
source/contact.md
source/index.md
```

output:

`tmp/sources.json`
```
[
    {
        "path": "source/bar/index.md",
        "data": { ... },
        "html": "..."
    },
    {
        "path": "source/baz/index.md",
        "data": { ... },
        "html": "..."
    },
    {
        "path": "source/about.md",
        "data": { ... },
        "html": "..."
    },
    {
        "path": "source/contact.md",
        "data": { ... },
        "html": "..."
    },
    {
        "path": "source/index.md",
        "data": { ... },
        "html": "..."
    }
]
```