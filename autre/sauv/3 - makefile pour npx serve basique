PORT=8001
PIDFILE=pid_server.txt

.PHONY: test clean

test:
	@if [ -f "$(PIDFILE)" ] && kill -0 $$(cat "$(PIDFILE)") 2>/dev/null; then \
		echo "server already running (pid $$(cat $(PIDFILE))) on http://localhost:$(PORT)/"; \
	else \
		npx serve -s src -l $(PORT) >/dev/null 2>&1 & echo $$! > "$(PIDFILE)"; \
		echo "server running (pid $$(cat $(PIDFILE))) on http://localhost:$(PORT)/"; \
	fi
	@open "http://localhost:$(PORT)/"

clean:
	@if [ -f "$(PIDFILE)" ]; then \
		kill $$(cat "$(PIDFILE)") 2>/dev/null || true; \
		rm -f "$(PIDFILE)"; \
		echo "cleaned"; \
	else \
		echo "already cleaned"; \
	fi
