using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using LagerHantering.Models;
using LagerHantering.Providers;
using LagerHantering.Repositories;
using Microsoft.AspNet.Identity;

namespace LagerHantering.API
{
    public class ComponentsController : ApiController
    {
        private DataAcess.DbContext db = DbContextProvider.Instance.DbContext;
        private UserRepository _repo = new UserRepository();

        // GET: api/Components
        public IQueryable<Component> GetComponents()
        {
            return db.Components;
        }

        // GET: api/Components/5
        [ResponseType(typeof(Component))]
        public IHttpActionResult GetComponent(int id)
        {
            Component component = db.Components.Find(id);
            if (component == null)
            {
                return NotFound();
            }

            return Ok(component);
        }

        // PUT: api/Components/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComponent(int id, Component component)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != component.Id)
            {
                return BadRequest();
            }

            db.Entry(component).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComponentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Components
        [ResponseType(typeof(Component))]
        [HttpPost]
        public IHttpActionResult PostComponent(Component component)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Components.Add(component);
            db.SaveChanges();

            return Ok();
        }

        // DELETE: api/Components/5
        [ResponseType(typeof(Component))]
        public IHttpActionResult DeleteComponent(int Id)
        {
            Component component = db.Components.Find(Id);
            if (component == null)
            {
                return NotFound();
            }

            db.Components.Remove(component);
            db.SaveChanges();

            return Ok(component);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                DbContextProvider.Instance.DisposeContext();
                db = null;
            }
            base.Dispose(disposing);
        }

        private bool ComponentExists(int id)
        {
            return db.Components.Count(e => e.Id == id) > 0;
        }
    }
}