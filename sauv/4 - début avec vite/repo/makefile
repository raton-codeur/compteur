test : node_modules
	npm run dev

node_modules : package-lock.json
	npm install

fclean :
	rm -rf node_modules/

.PHONY : test fclean
