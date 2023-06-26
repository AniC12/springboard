from unittest import TestCase

from app import app
from models import db, User, Post

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bloglyuser:bloglypassword@localhost/blogly'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True

db.drop_all()
db.create_all()

class UserViewTestCase(TestCase):

    def setUp(self):

        Post.query.delete()
        User.query.delete()

        user = User(first_name="Spider", last_name="Spiderman", image_url="https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png")
        
        db.session.add(user)
        db.session.commit()
        self.user_id = user.id
        
        user_id=user.id
        post = Post(title="Spider post", content="Spider's post content", user_id=user_id)

        db.session.add(post)
        db.session.commit()
        self.post_id = post.id

    def tearDown(self):

        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            response = client.get("/users")
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn('Spider', html)

    def test_show_user(self):
        with app.test_client() as client:
            response = client.get(f"/users/{self.user_id}")
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn('<h1>Spider Spiderman</h1>', html)


    def test_add_user(self):
        with app.test_client() as client:
            form_data = {
                "first_name": "TestFirstName", 
                "last_name": "TestLastName",
                "image_url": "https://www.seoptimer.com/blog/wp-content/uploads/2018/07/properly-optimized-url.png"}
            response = client.post("/users/new", data=form_data, follow_redirects=True)
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn(">TestFirstName TestLastName</a></li>", html)


    def test_add_post(self):
        with app.test_client() as client:
            form_data = {
                "title": "TestTitle",
                "content": "It's test post content",
                "user_id": f"{self.user_id}"
            }
            response = client.post(f"/users/{self.user_id}/posts/new", data=form_data, follow_redirects=True)
            html = response.get_data(as_text =True)

            self.assertEqual(response.status_code, 200)
            self.assertIn(">TestTitle</a></li>", html)


    def test_show_post(self):
        with app.test_client() as client:
            response = client.get(f"/posts/{self.post_id}")
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn('<h1>Spider post</h1>', html)


