/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
var request = require('request');

const PORT = process.env.PORT || 8080;

let app = express();
 
app.get('/home', (req, res) => {

    var options = {
        'method': 'POST',
        'url': 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PF=boZ6jpDwlNEmVzAGFiFx8i'
  },
    form: {
        'grant_type': 'client_credentials',
        'client_id': 'xuOxBGMyIELM9PgRJuD8aIoHU33laUVZ',
        'client_secret': 'aoQDAnNMvHfXwFSo',
        'scope': 'data:read data:write'
  }
};

    request(options, function (error, response) {
        if (error) { throw new Error(error); }
        //send token info
        res.json(response.body);
    });    
  })



app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: 'forge_session',
    keys: ['forge_secure_key'],
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days, same as refresh token
}));



app.use(express.json({ limit: '500mb' }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode).json(err);
    
});
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });



