import {Application, json ,urlencoded, Response, Request, NextFunction } from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import cookierSession from 'cookie-session'
import HTTP_STATUS from 'http-status-codes'
import 'express-async-errors'
import compression from 'compression'



const SERVER_PORT = 5000;





export  class ChattyServer{
    private app: Application;

    constructor(app: Application){
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app)
        this.standardMiddleware(this.app)
        this.routeMiddleware(this.app)
        this.globalErrorMiddleware(this.app)
        this.startServer(this.app)
        
    }

    private securityMiddleware(app: Application): void{
        app.use(
            cookierSession({
                name: 'session',
                keys: ['test1','test2'],
                maxAge: 24*7*3600,
                secure: false
            })
        )
        app.use(hpp());
        app.use(helmet());
        app.use(cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET','POST','PUT','DELETE', 'OPTIONS']
        }));
    }

    private standardMiddleware(app: Application): void{
        app.use(compression());
        app.use(json({limit: '50mb'}));
        app.use(urlencoded({extended:true, limit: '50mb'}));
    }

    private routeMiddleware(app: Application): void{}

    private globalErrorMiddleware(app: Application): void{}

    private startServer(app: Application): void{
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer)
        } catch (error) {
            console.log(error)
        }
    }

    private createSocketIO(httpServer: http.Server): void{}

    private startHttpServer(httpServer: http.Server): void{
        httpServer.listen( SERVER_PORT,()=>{
            console.log(`Server is running on port ${SERVER_PORT}.`);
            
        })
    }





}