using Microsoft.AspNetCore;

namespace GoogleForm;

public static class Program {
    public static void Main(string[] args) {
        try {
            CreateWebHostBuilder(args).Build().Run();
        } catch (Exception) {
            throw;
        }
    }

    private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .ConfigureLogging(logging => {
                logging.ClearProviders();
                logging.SetMinimumLevel(LogLevel.Trace);
            });
}
