t:
	npm test -- --testPathPattern=$(file)

e2e:
	npm test:e2e -- --testPathPattern=$(file)

# Create MQTT config directory and copy the template file
setup-mqtt-config:
	@mkdir -p ./mqtt/config
	@cp ./templates/mosquitto.conf.template ./mqtt/config/mosquitto.conf
	@echo "MQTT config file copied to ./mqtt/config/mosquitto.conf"
