namespace GoogleForm.Domain;

public class Form {
    public Form(string id) {
        Id = id;
    }

    public string Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public IList<FormItem> Items { get; set; } = new List<FormItem>();
}
