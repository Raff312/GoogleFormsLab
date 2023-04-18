using Microsoft.AspNetCore.Mvc;
using GoogleForm.Interfaces;
using GoogleForm.Domain;

namespace GoogleForm.Controllers;

[Route("forms")]
public class FormsApiController : ControllerBase {
    private readonly IGoogleFormsService _googleFormsService;

    public FormsApiController(IGoogleFormsService googleFormsService) {
        _googleFormsService = googleFormsService;
    }

    [HttpPost("{id}")]
    public async Task Send(string id, [FromBody] Dictionary<string, string> form) {
        await _googleFormsService.SendForm(id, form);
    }

    [HttpGet("{id}")]
    public async Task<Form?> Get(string id) {
        return await _googleFormsService.GetForm(id);
    }
}
