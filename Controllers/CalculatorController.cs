using Microsoft.AspNetCore.Mvc;

namespace spectra_systems.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalculatorController : ControllerBase
{

    private readonly ILogger<CalculatorController> _logger;

    public CalculatorController(ILogger<CalculatorController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string GetA()
    {
        return "hest";
    }
}
