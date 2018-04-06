# Node Overwatch
## Requirements
	1. Node 7.6+
	2. MongoDB
	3. Pug
	4. Express
	5. Yarn or NPM

## Outline
The following outlines the minimum requirements to be written into the core:
1. User
	* Login
	* Logout
	* Create
	* Update
	* Delete
	* Permissions
	* Modeling
	* Team roles
2. Team
	* Create
	* Update
	* Delete
	* Permissions
	* Modeling
3. File System
	* Create
	* Update
	* Delete
	* Permissions
4. Services
	1. Overwatch
		* Get User Data
		* Get Hero Data?
		* Get Map Data?
5. Server
	1. Database
		* Server Implementation
		* Templating Engine (PUG)
		* Auth (Battle.net)
		* MongoClient
		* Enforce HTTPS (LetsEncrypt)
	2. Client
		* Templating
		* Styles
		* Uploads (SW3)
	3. Routing
		* Client
		* Admin
6. Deployment
	* Platform Selection (Digital Ocean, Now, Heroku)
	* Strategy (git)
7. CodeBase
	* Implement ESLint?
	* Webpack

## Development Notes
1. Local
	* Create a variables.env file in the site's root folder
	* To start server in development mode, run the command `yarn run dev`
2. Data (IN PROGRESS)
	* To create sample data, run the command `yarn run sample`
3. SSL
	* Right now SSL cert is generated locally. In live mode we will need to add LetsEncrypt certs. __NOTE:__ HTTPS will not work without a proper cert.
4. Deployment
	* TODO



	