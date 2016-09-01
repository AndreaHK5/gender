IF EXIST "Gulpfile.js" (
 pushd "%DEPLOYMENT_TARGET%"
 call .\node_modules\.bin\gulp imagemin
 IF !ERRORLEVEL! NEQ 0 goto error
 popd
)