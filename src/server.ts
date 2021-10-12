import app from './index'
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`)
})

export default app
