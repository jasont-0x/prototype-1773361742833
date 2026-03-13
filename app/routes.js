const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/applicant-type', function (req, res) {
  res.render('applicant-type')
})

router.post('/applicant-type', function (req, res) {
  const answer = req.session.data['applicant-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-type': 'Select who you are applying for' }
    return res.render('applicant-type')
  }
  if (answer === 'someone-else') {
    return res.redirect('/ineligible-applicant-type')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-applicant-type', function (req, res) {
  res.render('ineligible-applicant-type')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name' }
    return res.render('full-name')
  }
  res.redirect('/email-address')
})

router.get('/email-address', function (req, res) {
  res.render('email-address')
})

router.post('/email-address', function (req, res) {
  const answer = req.session.data['email-address']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'email-address': 'Enter your email address' }
    return res.render('email-address')
  }
  res.redirect('/application-reason')
})

router.get('/application-reason', function (req, res) {
  res.render('application-reason')
})

router.post('/application-reason', function (req, res) {
  const answer = req.session.data['application-reason']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'application-reason': 'Enter why you are applying for this service' }
    return res.render('application-reason')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('QS')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
