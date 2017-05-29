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
using LagerHantering.ViewModels;

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
            var articlecomponents = db.ArticleComponent
                .Where(ac => ac.ArticleId == id)
                .Select(ac => ac.Component)
                .ToList();     
            
            if (articlecomponents == null)
            {
                return NotFound();
            }

            return Ok(articlecomponents);
        }

        // PUT: api/Articles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutArticle(int id, int amount, string comment)
        {


            Article article = db.Articles.Where(x => x.Id == id).FirstOrDefault();

            //var articlecomponents = article.Components;
            var articlecomponents = db.ArticleComponent.Where(x => x.ArticleId == id).ToList();


            foreach (var articlecomponent in articlecomponents)
            {

                var component = db.Components.Where(x => x.Id == articlecomponent.ComponentId).FirstOrDefault();
                var newamount = component.Amount - (amount * articlecomponent.ComponentAmount);

                if (newamount < 0)
                {
                    return BadRequest();
                }

                component.Amount = newamount;
                

            }


            db.Entry(article).State = EntityState.Modified;

            try
            {
                var user = GetCurrentUser();
                var order = new Order { Amount = amount, Article = article.Name, Comment = comment, Date = DateTime.Now, User = user };
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
        public IHttpActionResult PostArticle(ArticleViewModel article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            Article newArticle = new Article
            {
                Name = article.Name
            };

            db.Articles.Add(newArticle);

            List<ArticleComponent> articleComponents = new List<ArticleComponent>();

            foreach (var component in article.Components)
            {
                ArticleComponent articleComponent = new ArticleComponent();

                articleComponent.ArticleId = newArticle.Id;
                articleComponent.ComponentAmount = component.ComponentAmount;
                articleComponent.ComponentId = component.Id;


                articleComponents.Add(articleComponent);

            }

            db.ArticleComponent.AddRange(articleComponents);

            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = article.Name }, article);
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
            return db.Articles.Count(e => e.Id == id) > 0;
        }
    }
}