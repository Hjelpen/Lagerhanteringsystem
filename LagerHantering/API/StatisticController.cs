using LagerHantering.DataAcess;
using LagerHantering.Models;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace LagerHantering.API
{
    [Authorize]
    public class StatisticController : ApiController
    {         
        DefaultDbContext db = new DefaultDbContext();

        [Route("api/Statistic/GetOrders")]
        public dynamic GetOrders()
        {
            return db.Orders.ToList();
        }

        [Route("api/Statistic/GetReceipts")]
        public dynamic GetReceipts()
        {
            return db.Receipts.ToList();
        }


        [Route("api/Statistic/UpdateInvoice")]
        public dynamic UpdateInvoice(int id)
        {

            Order order = db.Orders.Find(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != order.Id)
            {
                return BadRequest();
            }
            if (order.InvoiceSent == true)
            {
                order.InvoiceSent = false;
            }
            else
            {
                order.InvoiceSent = true;
            }

            db.Entry(order).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
