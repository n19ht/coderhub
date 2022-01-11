const app = require('./app')
require('./app/database')
const { APP_PORT } = require('./app/config')

app.listen(8888, () => {
    console.log(`服务器在${APP_PORT}端口启动成功~`);
})