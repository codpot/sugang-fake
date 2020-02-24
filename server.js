const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));

const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get('/core', async (req, res, next) => {
  switch(req.query.attribute) {
    case 'coreData_ko':
      res.render('core/coreData_ko');
      break;
    case 'coreMain_ko':
      res.render('core/coreMain_ko');
      break;
    case 'coreNotice_ko':
      res.render('core/coreNotice_ko');
      break;
    case 'dateChk':
      res.render('core/dateChk');
      break;
    case 'lectListJson':
      await Sleep(2000);
      if (req.query.lecture_cd !== '') {
        res.render('core/lectListJson_2');
      } else {
        res.render('core/lectListJson_1');
      }
      break;
    case 'logOut':
      res.render('core/logOut');
      break;
    default:
      next();
  }
});

app.post('/core', (req, res, next) => {
  switch(req.query.attribute) {
    case 'coreFrame_ko':
      res.render('core/coreFrame_ko');
      break;
    case 'retake':
      res.render('core/retake');
      break;
    default:
      next();
  }
});

app.get('/login', (req, res, next) => {
  switch(req.query.attribute) {
    case 'loginContents':
      res.render('login/loginContents');
      break;
    case 'loginFrame':
      res.render('login/loginFrame');
      break;
    case 'loginMain':
      res.render('login/loginMain');
      break;
    case 'loginTab':
      res.render('login/loginTab');
      break;
    default:
      next();
  }
});

app.post('/login', (req, res, next) => {
  switch(req.query.attribute) {
    case 'loginChk':
      res.render('login/loginChk', { callback: req.query.callback });
      break;
    default:
      next();
  }
});

app.get('/sugang', (req, res, next) => {
  switch(req.query.attribute) {
    case 'sugangBasketListJson':
      res.render('sugang/sugangBasketListJson');
      break;
    case 'sugangListJson':
      res.render('sugang/sugangListJson');
      break;
    case 'sugangMain':
      res.render('sugang/sugangMain');
      break;
    default:
      next();
  }
});

app.post('/sugang', async (req, res, next) => {
  switch(req.query.attribute) {
    case 'sugangMode':
      await Sleep(2000);
      if (req.query.mode === 'insert') {
        if (req.body.params.indexOf('RET123') > -1) {
          if (req.body.reSugang_key === '201') {
            res.render('sugang/sugangMode', { code: '200', msg: '신청되었습니다' });
          } else {
            res.render('sugang/sugangMode', { code: '201', msg: '재수강' });
          }
        } else if (req.body.params.indexOf('REF123') > -1) {
          res.render('sugang/sugangMode', { code: '500', msg: '재수강은 성적제한 등급을 초과하여 재수강이 불가 합니다.!!' });
        } else if (req.body.params.indexOf('OVF123') > -1) {
          res.render('sugang/sugangMode', { code: '500', msg: '수강인원이 초과되었습니다.' });
        } else {
          res.render('sugang/sugangMode', { code: '200', msg: '신청되었습니다' });
        }
      } else if (req.query.mode === 'delete') {
        res.render('sugang/sugangMode', { code: '200', msg: '삭제되었습니다!' });
      } else {
        res.render('sugang/sugangMode', { code: '500', msg: '잘못된요청입니다.' });
      }
      break;
    case 'waitCntJson':
      res.render('sugang/waitCntJson');
      break;
    default:
      next();
  }
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(port, '127.0.0.1');
