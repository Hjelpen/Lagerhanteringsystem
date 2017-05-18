using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using LagerHantering.Models;
using LagerHantering.Providers;
using LagerHantering.Repositories;

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
        [HttpGet]
        public IHttpActionResult GetComponent(int id)
        {
            Component component = db.Components.Where(x => x.ComponentId == id).FirstOrDefault();
            if (component == null)
            {
                return NotFound();
            }

            return Ok(component);
        }

        // PUT: api/Components/5
        [HttpPut]
        public dynamic EditComponent(int id, int amount)
        {

            Component component = db.Components.Where(x => x.Id == id).FirstOrDefault();
            component.Amount = amount;

            db.Entry(component).State = EntityState.Modified;

            try
            {

                db.SaveChanges();
                return new
                {
                    Success = true,
                    Component = component
                };


            }

            catch (DbUpdateConcurrencyException)
            {
                if (!ComponentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return new
                    {
                        Success = false,
                        Component = component
                    };

                }
            }



        }




        // POST: api/Components
        [ResponseType(typeof(Component))]
        public IHttpActionResult PostComponent(Component component)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Components.Add(component);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = component.ComponentId }, component);
        }

        // DELETE: api/Components/5
        [ResponseType(typeof(Component))]
        [HttpDelete]
        public IHttpActionResult DeleteComponent(int id)
        {
            Component component = db.Components.Find(id);
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
            return db.Components.Count(e => e.ComponentId == id) > 0;
        }
    }
}