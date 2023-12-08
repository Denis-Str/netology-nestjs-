import express from 'express';
const route = express.Router();
import booksRoutes from './books';
import userRoutes from './user';

route.use(booksRoutes);
route.use(userRoutes);
route.get('/', (req:any, res:any) => {
  res.render('index', { title: 'Main' });
});


export default route;