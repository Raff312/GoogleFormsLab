using GoogleForm.Domain;

namespace GoogleForm.Interfaces;

public interface IGoogleFormsService {
    Task SendForm(string id, Dictionary<string, string> data);
    Task<Form?> GetForm(string id);
}
