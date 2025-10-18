using Microsoft.AspNetCore.Mvc;
using SuporteTecnico.Dominio;
using SuporteTecnico.Service;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace SuporteTecnico.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamadosController : ControllerBase
    {
        private readonly IChamadoService _service;
        public ChamadosController(IChamadoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var chamados = await _service.GetAllAsync();
            return Ok(chamados);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var chamado = await _service.GetByIdAsync(id);
            if (chamado == null) return NotFound();
            return Ok(chamado);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Chamado chamado)
        {
            var created = await _service.CreateAsync(chamado);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Chamado chamado)
        {
            if (id != chamado.Id) return BadRequest();
            var updated = await _service.UpdateAsync(chamado);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetByStatus(string status)
        {
            var chamados = await _service.GetByStatusAsync(status);
            return Ok(chamados);
        }

        // ✅ Método extra válido, agora dentro da classe
        [HttpGet("tickets")]
        public async Task<ActionResult<IEnumerable<Chamado>>> GetTickets()
        {
            var chamados = await _service.ListarChamados();
            return Ok(chamados);
        }
    }
}
