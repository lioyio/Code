const fs = require('fs')
const compiler = require('vue-template-compiler')

process.stdin.on('end', function () {
    process.stdout.write('end')
});

function gets(cb, txt) {
    process.stdin.setEncoding('utf8')
    process.stdin.resume()
    process.stdin.on('data', function (chunk) {
        cb(chunk)
    })
    console.log(txt)
}

gets(function (result) {
    result = result.replace(/\r\n/g,'')
    fs.readFile('./'+result+'.vue','utf8',function(err,data){
        const parsed = compiler.parseComponent(data);
        const template = parsed.template ? parsed.template.content : ''
        const script = parsed.script ? parsed.script.content : ''
    
        const templateEscaped = template.trim().replace(/`/g, '\\`');
        const scriptWithTemplate = script.match(/export default ?\{/)
            ? script.replace(/export default ?\{/, `$&\n\ttemplate: \`\n${templateEscaped}\`,`)
            : `${script}\n export default {\n\ttemplate: \`\n${templateEscaped}\`};`
        fs.writeFile('./'+result+'.js',scriptWithTemplate,writecb);
        //process.stdout.write(scriptWithTemplate)
        process.stdin.pause()
    })
}, "请输入文件名:")

function writecb (err) {
    if (err) {
        throw err;
    }
    console.log('转换完成')
}