import { Router } from "https://deno.land/x/oak/mod.ts";

import * as launches from "./models/launches.model.ts";
import * as planets from "./models/planets.model.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    ctx.response.body = launches.getOne(Number(ctx.params.id));
  }
});

router.post("/launches", async (ctx) => {
  // console.log('body', ctx.request.body());
  const body = await ctx.request.body();
  launches.addOne(body.value);
  ctx.response.body = { success: true };
});

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = !!launches.removeOne(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAll();
});

router.get("/planets/:id", (ctx) => {
  if (ctx.params?.id) {
    ctx.response.body = planets.getOne(ctx.params.id);
  }
});

export default router;