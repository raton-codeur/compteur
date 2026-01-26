test :
	open http://localhost:5173

all : node_modules
	npm run dev

node_modules : package-lock.json
	npm install

fclean :
	rm -rf node_modules/

.PHONY : all fclean test
