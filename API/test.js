const http=require('http');
const fs=require('fs');

const port=3000;

const server=http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text.html'})
    fs.readFile('index.html', function(error, data){
        if(error){
            res.write('404');
            res.write(error);
        }else{
            res.write(data);
        }
    })
})

Server.listen(port, function(error){
    if(error){
        console.log('error detected ', error);
    }else{
        console.log('listening to port number' +port)
    }
})