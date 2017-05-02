export default function(req, res){
  var DEV_ENVIRONMENT = process.env.NODE_ENV === 'development';
  res.locals = {
    // renderedContent: ReactDOMServer.renderToString(React.createElement(App,{})),
    devEnv: process.env.NODE_ENV === 'development',
  };
  res.render('default');
}