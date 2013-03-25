namespace :sass do
  str = 'sass/cmyk.scss:cmyk.css --style compressed'

  task :watch => [:update] do
    system "sass --watch #{str}"
  end

  task :update do
    system "sass --update #{str}"
  end
end
