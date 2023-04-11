using GoogleForm.Domain;

namespace GoogleForm.Interfaces;

public interface IGoogleFormsService {
    Task<Form?> GetForm(string id);
}
