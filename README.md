## Book Database

http://a3-elizabethkirschner.glitch.me

The goal of this application is to provide a database of books for specified users. The biggest challenge of this project was the Express learning curve and understanding how passport worked.  I used passport-local as an authentication strategy.  I choose passport-local because it seemed simple, and I like writing my own server code, so I thought it would be more interesting to implement authentication myself, rather than authenticating through another service. I used lowdb for my database. I also chose this because it was easy to implement.  There are two valid users with unique data:

                                            username: jack          username: jill
                                            password: secret        password: birthday

I used the Tacit CSS framework (https://yegor256.github.io/tacit/).  I choose this framework because the author advertised it as a simple framework for backend developers. I did not modify the CSS framework in any way.  I used 5 middleware packages in this project:

Helmet -- used for server security, it makes my application safer
Passport -- used for user authentication
express static -- establishes path for serving static .js files
express json -- used for parsing json sent from client
logger -- morgan based logger that only logs during development, very simple and useful 
others included: (both required for passport to work)
    express-session
    body-parser

## Technical Achievements
- **Tech Achievement 1**: Edit functionality populate form for easy editing
- **Tech Achievement 2**: Table displays dynamically on each addition or edit to the data. Because of this, all entries can be removed without breaking the application.

### Design/Evaluation Achievements
- **Design Achievement 1**: Used the express generator to structure server/app architecture 
