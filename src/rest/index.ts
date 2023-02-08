import express from "express";
import cors from "cors";
import api from "./api";
// import web from "./web";

export default class Rest {
    app: express;
    constructor() {
        this.app = new express();
        this.app.get("/", (_req, res) => {
            return res.status(200).json({
                status: "OK"
            });
        });

        this.middleware();
        // this.app.use("/web", web);
        this.app.use("/api", api);
        this.app.get("/", (req, res) => {
            res.redirect("/web/index.html");
        });
        this.app.all("*", (_req, res, ) => {
            return res.status(404).json({
                code: 404,
                message: "RouteNotFound"
            });
        });

    }

    middleware(){
        this.app.use(express.json());
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST"]
        }));
    }

    listen(ip: string, port: number){
        const server = this.app.listen(port, () => {
            console.log(`Rest api is listening on http://${ip}:${port}`);
        });
    }


}