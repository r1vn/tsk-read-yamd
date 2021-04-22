'use strict' // 2021-02-09 13.00

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const jsyaml = require('js-yaml')
const { xdDirScan } = require('./util/xdDirScan')
const { xdFileWrite } = require('./util/xdFileWrite')
const { xdPath } = require('./util/xdPath')
const Config = require('./Config')

module.exports = function tsk_read_yamd (cfg)
{
    const debug = process.argv.includes('-debug')
    const config = new Config(cfg)
    if (debug) console.log({ config })
    const srcdirRel  = xdPath.std(config.sourceDir)
    const srcdirAbs  = xdPath.abs(config.sourceDir)
    const outfileRel = xdPath.std(config.outputFile)
    const outfileAbs = xdPath.abs(config.outputFile)
    if (debug) console.log({ srcdirRel, srcdirAbs, outfileRel, outfileAbs })
    const srcs = xdDirScan(`${ srcdirAbs }`, 'files').filter(config.filterFn)
    if (!srcs.length) return console.log(`no matches`)
    const entries = []

    for (let i = 0; i < srcs.length; i++)
    {
        const srcRel = `${ srcdirRel }/${ srcs[i] }`
        const srcAbs = `${ srcdirAbs }/${ srcs[i] }`
        if (config.verbose) console.log(`${ i + 1 }/${ srcs.length } ${ srcRel }`)
        if (debug) console.log({ srcRel, srcAbs })

        const source = fs.readFileSync(srcAbs, 'utf8')
        let data, md
        const datablock = source.match(/^\s*---((.|\n)*?)---/)

        if (datablock)
        {
            data = jsyaml.load(datablock[1]) || {}
            md = source.replace(datablock[0], '')
        }
        else
        {
            data = {}
            md = source
        }

        const entry =
        {
            path: srcRel,
            data,
            html: marked(md, { headerIds: false })
        }

        entries.push(entry)
        if (debug) console.log({ path: entry.path, data: entry.data, html: entry.html.slice(0, 80) })
    }

    console.log(`\n${ srcs.length } ${ srcs.length === 1 ? 'file' : 'files' } -> ${ outfileRel }`)

    if (!config.overwrite && fs.existsSync(outfileAbs))
    {
        console.log('\noutput file already exists. merging')
        const exentries = require(outfileAbs)
        if (!(exentries instanceof Array)) throw `existing output file does not contain an array of entries`
        xdFileWrite(outfileAbs, JSON.stringify([...exentries, ...entries], null, 4))
    }
    else
    {
        xdFileWrite(outfileAbs, JSON.stringify(entries, null, 4))
    }
}