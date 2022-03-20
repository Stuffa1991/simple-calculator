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

    [HttpPost]
    [Consumes("application/json")]
    public CalculateResponse Calculate(CalculateRequest request)
    {
        CalculateResponse response = new CalculateResponse();

        switch (request.operand) {
          case "*":
            response.result = request.calculatedResult * request.currentResult;
            break;
          case "/":
            try {
                response.result = request.calculatedResult / request.currentResult;
            } catch (DivideByZeroException) {
                // Divided by zero
            }
            break;
          case "+":
            response.result = request.calculatedResult + request.currentResult;
            break;
          case "-":
            response.result = request.calculatedResult - request.currentResult;
            break;
        }

        return response;
    }
}
