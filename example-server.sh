#java -jar target/dist/JSCover.jar -ws --branch --document-root=doc/example --report-dir=target
#java -jar target/dist/JSCover-all.jar -ws --branch --document-root=doc/example-qunit --report-dir=target
#java -jar target/dist/JSCover.jar -ws --branch --document-root=doc/example-qunit/src --report-dir=target
java -jar target/dist/JSCover-all.jar -ws --branch  --report-dir=target/report --no-instrument=assets/themes/LP/js/jasmine-standalone-1.3.1/ --no-instrument=assets/themes/LP/js/lib/