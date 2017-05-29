const defaultConfig = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*',
    exposedHeaders: ['Content-Length'],
    allowHeaders: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range']
}

const configMethods = (options) => {
    let methods = options.methods || defaultConfig.methods;

    if(methods.join)
        methods = methods.join(',');
    
    return {
        key: 'Access-Control-Allow-Methods',
        val: methods
    };
}

const configOrigin = (options, req) => {
    let origin = options.origin || req.get('Origin') || defaultConfig.origin;
    return {
        key: 'Access-Control-Allow-Origin',
        val: origin
    };
}

const configExposedHeaders = (options) => {
    let exh = options.exposedHeaders || defaultConfig.exposedHeaders;
    if(exh.join)
        exh = exh.join(',');

    return {
        key: 'Access-Control-Expose-Headers',
        val: exh
    }
}

const configAllowHeaders = (options) => {
    let alh = options.allowHeaders || defaultConfig.allowHeaders;
    
    if(alh.join)
        alh = alh.join(',');

    return {
        key: 'Access-Control-Expose-Headers',
        val: alh
    }
}

const applyHeaders = (headers, res) => {
    for(let i in headers){
        res.setHeader(headers[i].key, headers[i].val);
    }
}

const corsMiddleware = (options) => {
    headers = [];

    return (req, res, next) => {
        headers.push(configMethods(options));
        headers.push(configOrigin(options, req));
        headers.push(configExposedHeaders(options));
        headers.push(configAllowHeaders(options));

        applyHeaders(headers, res);
        next();
    }   
}
