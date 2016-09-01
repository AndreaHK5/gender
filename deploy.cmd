IF EXIST "%DEPLOYMENT_TARGET%\Client\bower.json" (

pushd "%DEPLOYMENT_TARGET%\Client"

call ..\node_modules\.bin\bower install

IF !ERRORLEVEL! NEQ 0 goto error

popd

)