import {Router} from 'express';

const routerTest = new Router();

routerTest.get("/test", (request, response) => {
  console.log(request.cookies);
  let cookieVal = request.cookies?.username;

  let show = cookieVal 
    ? `Hi ${cookieVal}. <a href="/delete">delete</a>`
    : `<a href="/set">set</a><br /><a href="/delete">delete</a>`
    response.send(show);
});

routerTest.get("/set", (request, response) => {
  response.cookie("username", "Ann", { 
    maxAge: 30000,
    expires: new Date(`01 01 2030`),
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });

  response.redirect("/test");
});

routerTest.get("/delete", (request, response) => {
  response.clearCookie("username");
  response.redirect("/test");
})

export default routerTest;