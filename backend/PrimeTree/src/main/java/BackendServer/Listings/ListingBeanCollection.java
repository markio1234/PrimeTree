package BackendServer.Listings;

import java.util.HashMap;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import BackendServer.Listings.ObjectControllers.ListingObjectController;
import BackendServer.Listings.ObjectControllers.SellItemObjectController;


/**This class defines all beans relevant for the implementation of the Listing-REST-methods 
 * and enables the JpaRepositories of listingdb*/
@Configuration
@PropertySource({ "classpath:application.properties" })
@EnableJpaRepositories(
		basePackages = "BackendServer.Listings.ListingRepositories",
		entityManagerFactoryRef = "listingEntityManager", 
	    transactionManagerRef = "listingTransactionManager"
		)
public class ListingBeanCollection {
	
	@Autowired
    private Environment env;
    
    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean listingEntityManager() {
        LocalContainerEntityManagerFactoryBean em
          = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(listingDataSource());
        em.setPackagesToScan(
          new String[] { "BackendServer.ListingEntities" });
 
        HibernateJpaVendorAdapter vendorAdapter
          = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto",
          env.getProperty("hibernate.hbm2ddl.auto"));
        properties.put("hibernate.dialect",
          env.getProperty("hibernate.dialect"));
        em.setJpaPropertyMap(properties);
 
        return em;
    }
 
    @Primary
    @Bean
    public DataSource listingDataSource() {
  
        DriverManagerDataSource dataSource
          = new DriverManagerDataSource();
        dataSource.setDriverClassName(
          env.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(env.getProperty("listings.jdbc.url"));
        dataSource.setUsername(env.getProperty("listings.jdbc.user"));
        dataSource.setPassword(env.getProperty("listings.jdbc.pass"));
 
        return dataSource;
    }
 
    @Primary
    @Bean
    public PlatformTransactionManager listingTransactionManager() {
  
        JpaTransactionManager transactionManager
          = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
          listingEntityManager().getObject());
        return transactionManager;
    }
	
	@Bean 
	public SQLAdapter sqlAdapter(){
	   return new SQLAdapterImpl();
	}
	
	@Bean
	public ListingObjectController[] listingObjectControllerArray(){
		ListingObjectController[] returnValue={
				new SellItemObjectController()
		};
		return returnValue;
	}

}