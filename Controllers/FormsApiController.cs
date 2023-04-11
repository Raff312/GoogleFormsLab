using Microsoft.AspNetCore.Mvc;
using GoogleForm.Models;
using GoogleForm.Interfaces;

namespace GoogleForm.Controllers;

[Route("forms")]
public class FormsApiController : ControllerBase {
    private readonly IGoogleFormsService _googleFormsService;

    public FormsApiController(IGoogleFormsService googleFormsService) {
        _googleFormsService = googleFormsService;
    }

    [HttpPost]
    public async Task Send([FromBody] FormModel model) {
        throw new NotImplementedException();
    }

    [HttpGet("{id:string}")]
    public async Task<FormModel?> Get(string id) {
        var form = await _googleFormsService.GetForm(id);
        return FormModel.From(form);
    }
}
