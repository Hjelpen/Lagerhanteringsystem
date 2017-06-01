using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using LagerHantering.Models;
using LagerHantering.Providers;
using LagerHantering.Repositories;
using LagerHantering.DataAcess;
using System.Security.Claims;
using System.Net.Http;
using System;

namespace LagerHantering.API
{
    [Authorize]
    public class ComponentsController : ApiController
    {
        DefaultDbContext db = new DefaultDbContext();

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
            Component component = db.Components.Where(x => x.Id == id).FirstOrDefault();
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


        [HttpPut]
        public dynamic UpdateComponent(int id, int? OrderTime, decimal? price, string name, string articlenumber)
        {

            Component component = db.Components.Where(x => x.Id == id).FirstOrDefault();

            if (!string.IsNullOrEmpty(name))
            {
                component.Name = name;
            }

            if (!string.IsNullOrEmpty(articlenumber))
            {
                component.ArticleNumber = articlenumber;
            }
           
            if (OrderTime.HasValue && OrderTime > 0)
            {
                component.OrderTime = OrderTime;
            }
            
            if (price.HasValue && price > 0)
            {
                component.Price = price;
            }


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


        [HttpPut]
        [Route("api/Components/AddAmountComponent")]
        public dynamic AddAmountComponent(int id, int amount)
        {

            Component component = db.Components.Where(x => x.Id == id).FirstOrDefault();

            component.Amount = component.Amount + amount;

            db.Entry(component).State = EntityState.Modified;

            try
            {

                var user = GetCurrentUser();
                var receipt = new Receipt { Amount = amount, Component = component.Name, Date = DateTime.Now, User = user };
                db.Receipts.Add(receipt);
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

            return CreatedAtRoute("DefaultApi", new { id = component.Id }, component);
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

        private string GetCurrentUser()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var userName = principal.Claims.Where(c => c.Type == "user_name").Single().Value;

            return userName;
        }

        private bool ComponentExists(int id)
        {
            return db.Components.Count(e => e.Id == id) > 0;
        }
    }
}