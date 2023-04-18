using Google.Apis.Auth.OAuth2;
using Google.Apis.Forms.v1;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using GoogleForm.Domain;
using GoogleForm.Interfaces;

namespace GoogleForm.Services;

public class GoogleFormsService : IGoogleFormsService {
    private readonly string URL_TEMPLATE = "https://docs.google.com/forms/d/{0}/formResponse";
    private readonly HttpClient _client;
    private readonly List<string> _values = new() {
        "entry.2005620554", "entry.1045781291", "entry.1065046570", "entry.1166974658", "entry.839337160", "entry.839971147"
    };

    public GoogleFormsService() {
        _client = new HttpClient() {
            Timeout = TimeSpan.FromSeconds(30)
        };
    }

    public async Task SendForm(string id, Dictionary<string, string> data) {
        var bodyValues = new Dictionary<string, string>();
        var dataList = data.Select(x => x.Value).ToList();
        for (var i = 0; i < _values.Count; i++) {
            bodyValues[_values[i]] = dataList[i];
        }
        var content = new FormUrlEncodedContent(bodyValues);

        var url = string.Format(URL_TEMPLATE, id);
        var response = await _client.PostAsync(url, content);
        response.EnsureSuccessStatusCode();
    }

    public async Task<Form?> GetForm(string id) {
        var service = await GetService();
        var form = await service.Forms.Get(id).ExecuteAsync();
        return form is not null ? Map(form) : null;
    }

    private static async Task<FormsService> GetService() {
        var cred = await GetCredential();

        return new FormsService(new BaseClientService.Initializer {
            HttpClientInitializer = cred
        });
    }

    private static async Task<UserCredential> GetCredential() {
        using var stream = new FileStream("client_secrets.json", FileMode.Open, FileAccess.Read);
        return await GoogleWebAuthorizationBroker.AuthorizeAsync(
            GoogleClientSecrets.FromStream(stream).Secrets,
            new[] { FormsService.Scope.Drive, FormsService.Scope.FormsBody },
            "user", CancellationToken.None, new FileDataStore("Forms.Forms")
        );
    }

    private static Form Map(Google.Apis.Forms.v1.Data.Form googleForm) {
        return new Form(googleForm.FormId) {
            Items = googleForm.Items.Select(Map).ToList(),
            Title = googleForm.Info.DocumentTitle
        };
    }

    private static FormItem Map(Google.Apis.Forms.v1.Data.Item googleItem) {
        return new FormItem() {
            Title = googleItem.Title,
            Question = Map(googleItem.QuestionItem.Question)
        };
    }

    private static Question Map(Google.Apis.Forms.v1.Data.Question googleQuestion) {
        return new Question() {
            Required = googleQuestion.Required,
            TextQuestion = Map(googleQuestion.TextQuestion),
            ChoiceQuestion = Map(googleQuestion.ChoiceQuestion)
        };
    }

    private static TextQuestion? Map(Google.Apis.Forms.v1.Data.TextQuestion? googleTextQuestion) {
        if (googleTextQuestion is null) {
            return null;
        }

        return new TextQuestion();
    }

    private static ChoiceQuestion? Map(Google.Apis.Forms.v1.Data.ChoiceQuestion? googleChoiceQuestion) {
        if (googleChoiceQuestion is null) {
            return null;
        }

        return new ChoiceQuestion() {
            Options = googleChoiceQuestion.Options.Select(Map).ToList()
        };
    }

    private static Option Map(Google.Apis.Forms.v1.Data.Option googleOption) {
        return new Option() {
            Value = googleOption.Value
        };
    }
}
