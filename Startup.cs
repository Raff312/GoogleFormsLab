using GoogleForm.Interfaces;
using GoogleForm.Services;
using Microsoft.AspNetCore.HttpOverrides;

namespace GoogleForm;

public class Startup {
    public Startup(IHostEnvironment env) {
        var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", false, true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
            .AddEnvironmentVariables();

        HostEnvironment = env;
        Configuration = builder.Build();
        Environment = env.EnvironmentName;
    }

    private IHostEnvironment HostEnvironment { get; }

    private IConfigurationRoot Configuration { get; }

    private string Environment { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
        services.AddOptions();

        services.AddTransient<IGoogleFormsService, GoogleFormsService>();

        services.AddCors(options => {
            options.AddDefaultPolicy(
                policy => {
                    policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost").AllowAnyHeader().AllowAnyMethod();
                });
        });

        services.AddControllers();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
        app.UsePathBase("/api");

        app.UseForwardedHeaders(new ForwardedHeadersOptions {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
        });

        if (env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseCors();

        app.UseEndpoints(endpoints => {
            endpoints.MapControllers();
        });
    }
}
