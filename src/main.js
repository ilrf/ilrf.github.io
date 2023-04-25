const fs = require('fs');

const postPath = 'post/';
const templatePath = 'src/template/';
const distPath = '';

function Article(basename, text) {
  this.basename = basename;
  this.text = text;
  this.modifiedDate = fs.statSync(postPath + basename + '.md').mtime;
  this.link = '/' + distPath + 'article/' + basename + '.html';
  const regex = /<h1>(.*?)<\/h1>/;
  this.title = regex.exec(text)[1];
}

function readMdFiles(basepath) {
  var files = fs.readdirSync(basepath);
  const regex = /([^\/]+)\.md$/;
  var mdfiles = [], len = 0;
  for (var i = 0; i < files.length; i++) {
    var match = regex.exec(files[i]);
    if (match) {
      mdfiles[len++] = match[1];
    }
  }
  return mdfiles;
}

function transform(filepath) {
  var text = fs.readFileSync(filepath).toString();
  const yamlMatch = text.match(/^(---\s*\n.*?\n?)^(---\s*$\n?)/ms);
  const yaml = yamlMatch ? yamlMatch[0] : '';
  text = text.replace(yaml, '');
  const prism = require('prismjs');
  const md = require('markdown-it')({
    highlight: function (code, lang) {
      if (lang) {
        if (prism.languages[lang] === undefined) {
          const loadLanguages = require('prismjs/components/');
          loadLanguages([lang]);
        }
        return prism.highlight(code, prism.languages[lang], lang);
      }
    }
  });
  var html = md.render(text);
  return html;
}


function genArticles() {
  var articles = [];
  var basenames = readMdFiles(postPath);
  for (var i = 0; i < basenames.length; i++) {
    var filepath = postPath + basenames[i] + '.md';
    var text = transform(filepath);
    articles[i] = new Article(basenames[i], text);
  }
  return articles;
}


// generate pages

const HEADER = fs.readFileSync(templatePath + 'components/header.html').toString();
const FOOTER = fs.readFileSync(templatePath + 'components/footer.html').toString();


function Page(content, header = HEADER, footer = FOOTER) {
  this.header = header;
  this.footer = footer;
  this.content = content;
}

function generate(template, destination, data) {
  var initText = fs.readFileSync(template).toString();
  const Handlebars = require('handlebars');
  var temp = Handlebars.compile(initText);
  var gen = temp(data);
  fs.writeFileSync(destination, gen);
}


function initDist() {
  const oldfiles = fs.readdirSync(distPath + 'article/');
  oldfiles.forEach(filename => {
    const filepath = distPath + 'article/' + filename;
    if (fs.statSync(filepath).isDirectory()) {
      fs.rmdirSync(filepath, { recursive: true });
    } else {
      fs.unlinkSync(filepath)
    }
  })
}

initDist();

const articles = genArticles().sort(function (a, b) { return b.modifiedDate - a.modifiedDate; });

for (var i = 0; i < articles.length; i++) {
  generate(templatePath + 'article/_article.html', distPath + 'article/' + articles[i].basename + '.html', new Page(articles[i]));
}

generate(templatePath + 'article/_index.html', 'index.html', new Page(articles));

