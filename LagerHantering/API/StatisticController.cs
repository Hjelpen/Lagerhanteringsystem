using LagerHantering.DataAcess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LagerHantering.API
{
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


    }
}
