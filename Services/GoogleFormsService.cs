using Google.Apis.Auth.OAuth2;
using Google.Apis.Forms.v1;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using GoogleForm.Domain;
using GoogleForm.Interfaces;

namespace GoogleForm.Services;

public class GoogleFormsService : IGoogleFormsService {
    public async Task<Form?> GetForm(string id) {
        var service = await GetService();
        var form = await service.Forms.Get(id).ExecuteAsync();
        return form is not null ? new Form(form.FormId) : null;
    }

    private static async Task<FormsService> GetService() {
        using var stream = new FileStream("client_secrets.json", FileMode.Open, FileAccess.Read);
        var cred = await GoogleWebAuthorizationBroker.AuthorizeAsync(
            GoogleClientSecrets.FromStream(stream).Secrets,
            new[] { FormsService.Scope.Drive },
            "user", CancellationToken.None, new FileDataStore("Forms.Forms"));

        return new FormsService(new BaseClientService.Initializer {
            HttpClientInitializer = cred
        });
    }
}
