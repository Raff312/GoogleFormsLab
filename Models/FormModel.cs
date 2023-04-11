using System.Diagnostics.CodeAnalysis;
using GoogleForm.Domain;

namespace GoogleForm.Models;

public class FormModel {
    public string Id { get; set; } = string.Empty;

    [return: NotNullIfNotNull("form")]
    public static FormModel? From(Form? form) {
        if (form is null) {
            return null;
        }

        return new() {
            Id = form.Id
        };
    }
}
