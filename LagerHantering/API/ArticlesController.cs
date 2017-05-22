using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using LagerHantering.Models;
using LagerHantering.Providers;
using System.Collections.Generic;
using LagerHantering.DataAcess;
using System.Data.Entity;
using System;
using LagerHantering.Repositories;
using System.Security.Claims;
using System.Net.Http;

namespace LagerHantering.API
{
    public class ArticlesController : ApiController
    {
        DefaultDbContext db = new DefaultDbContext();
        private UserRepository _repo = new UserRepository();

        // GET: api/Articles
        public dynamic GetArticles()
        {
            return db.Articles.ToList();
        }

        // GET: api/Articles/5
        [ResponseType(typeof(Article))]
        public IHttpActionResult GetArticle(int id)
        {
            Article article = db.Articles.Find(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        // PUT: api/Articles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutArticle(int id, int amount)
        {


            Article article = db.Articles.Where(x => x.ArticleId == id).FirstOrDefault();

            var articlecomponents = article.Components;

            foreach (var component in articlecomponents)
            {

                var newamount = component.Amount - amount;


                if (newamount < 0)
                {
                    return BadRequest();
                }
                component.Amount = component.Amount - amount;
            }


            db.Entry(article).State = EntityState.Modified;

            try
            {
                var user = GetCurrentUser();
                var order = new Order { Amount = amount, Article = article.Name, Date = DateTime.Now, User = user};
                db.Orders.Add(order);
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
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

        // POST: api/Articles
        [ResponseType(typeof(Article))]
        public IHttpActionResult PostArticle(Article article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var components = new List<Component>();
            foreach (var component in article.Components)
            {
                components.Add(db.Components.Find(component.ComponentId));
            }

            article.Components = null;
            article.Components = components;

            db.Articles.Add(article);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = article.ArticleId }, article);
        }

        // DELETE: api/Articles/5
        [ResponseType(typeof(Article))]
        public IHttpActionResult DeleteArticle(int id)
        {
            Article article = db.Articles.Find(id);
            if (article == null)
            {
                return NotFound();
            }

            db.Articles.Remove(article);
            db.SaveChanges();

            return Ok(article);
        }

          private string GetCurrentUser()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var userName = principal.Claims.Where(c => c.Type == "user_name").Single().Value;

            return userName;
        }

        private bool ArticleExists(int id)
        {
            return db.Articles.Count(e => e.ArticleId == id) > 0;
        }
    }
}